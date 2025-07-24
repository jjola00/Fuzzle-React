# Sensors Testing Guide

## Files
* **pir_test.py** – console test for the HC‑SR501 PIR motion sensor.
* **camera_motion_eye_test.py** – live preview with movement + eye detection overlays.

Copy the files to your Raspberry Pi (`scp ...`) and make them executable:

```bash
chmod +x pir_test.py camera_motion_eye_test.py
```

## 1. PIR Motion Sensor

| PIR pin | Pi pin | Notes |
|---------|--------|-------|
| VCC     | **5 V** (pin 2) | jumper to 5 V rail |
| GND     | **GND** (pin 6) | common ground |
| OUT     | **GPIO23** (pin 16) | **digital input** |

**Test**

1. Wire the sensor as above – _do **NOT** share GPIO18 (pin 12) because it is the I²S BCLK for the audio HAT_.
2. Run `./pir_test.py`.
3. Wait ~30 s for the PIR to stabilise (its onboard LED stops blinking).
4. Wave a hand in front of the sensor – the script prints a timestamped “Motion detected!” line.
5. Tune the module’s potmeters (delay & sensitivity) until detection is reliable at your desired range.

## 2. Camera (CSI)

Enable the camera interface in **raspi-config ▶ Interfaces ▶ Camera** and reboot.

**Test**

```bash
./camera_motion_eye_test.py
```

A 640×480 preview appears:

* **Green boxes**: face bounding‑boxes  
* **Blue boxes**: detected eyes  
* Every significant frame delta (>5 000 px) logs “Movement detected” in the terminal.

### Thresholds

* `MOTION_THRESHOLD` – increase for less sensitivity.  
* Eye detection uses OpenCV’s Haar cascades; for higher precision switch to **Mediapipe Face Mesh** later.

## Next Steps

* On motion event, trigger a coroutine that wakes the study‑buddy: sud servo pose + start eye tracking.
* Feed face/eye coordinates into servo driver so the bot’s eyes track the learner.
* Consider adding a sanity watchdog that de‑duplicates events within 1 s (`EARLY_COOLDOWN`).

---

© 2025 Study Buddy Team
