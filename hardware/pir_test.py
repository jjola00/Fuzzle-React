#!/usr/bin/env python3
import time
import RPi.GPIO as GPIO

PIR_PIN        = 23     # BCM pin
WARMUP_SEC     = 30     # initial sensor warmup
SAMPLE_SEC     = 0.1    # poll rate
MIN_HIGH_SEC   = 0.3    # must stay HIGH this long to count as motion
COOLDOWN_SEC   = 2.0    # ignore new motion for this long after a trigger
SUMMARY_EVERY  = 60     # print duty-cycle summary every N seconds

def main():
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(PIR_PIN, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)

    print(f"[PIR] Warmup {WARMUP_SEC}s…"); time.sleep(WARMUP_SEC)
    print("[PIR] Ready.")

    last_state = GPIO.input(PIR_PIN)
    state_since = time.time()
    last_trigger = 0
    hi_acc = lo_acc = 0
    last_summary = time.time()
    high_start = None

    try:
        while True:
            now = time.time()
            state = GPIO.input(PIR_PIN)

            # accumulate duty cycle
            if state: hi_acc += SAMPLE_SEC
            else:     lo_acc += SAMPLE_SEC

            # edge change
            if state != last_state:
                duration = now - state_since
                print(f"{time.strftime('%H:%M:%S')} -> {'HIGH' if state else 'LOW'} "
                      f"(prev {duration:.2f}s)")
                state_since = now
                last_state = state
                # handle debounced trigger
                if state:  # went HIGH
                    high_start = now
                else:      # went LOW
                    high_start = None

            # check debounce/coooldown
            if high_start and (now - high_start >= MIN_HIGH_SEC):
                if now - last_trigger >= COOLDOWN_SEC:
                    print(f"{time.strftime('%H:%M:%S')} MOTION event "
                          f"(held high {now - high_start:.2f}s)")
                    last_trigger = now
                high_start = None  # don’t re-fire until it drops LOW again

            # periodic summary
            if now - last_summary >= SUMMARY_EVERY:
                total = hi_acc + lo_acc or 1
                pct = hi_acc / total * 100
                print(f"[SUMMARY {time.strftime('%H:%M:%S')}] HIGH {hi_acc:.1f}s "
                      f"({pct:.1f}%), LOW {lo_acc:.1f}s")
                hi_acc = lo_acc = 0
                last_summary = now

            time.sleep(SAMPLE_SEC)

    except KeyboardInterrupt:
        print("Exiting")
    finally:
        GPIO.cleanup()

if __name__ == "__main__":
    main()
