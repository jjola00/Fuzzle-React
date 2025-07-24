import time, RPi.GPIO as GPIO
GPIO.setmode(GPIO.BCM)
GPIO.setup(23, GPIO.IN)
try:
    while True:
        print(GPIO.input(23))
        time.sleep(0.2)
except KeyboardInterrupt:
    GPIO.cleanup()
