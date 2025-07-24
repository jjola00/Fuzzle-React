#!/usr/bin/env python3
"""Simple camera test: live movement + eye detection overlay.

Prerequisites:
  sudo apt install python3-opencv python3-picamera2 libatlas-base-dev
  (or use open-source PiCam stack / USB cam with cv2.VideoCapture)

Press 'q' to quit.
"""

import time
import cv2
import numpy as np
from picamera2 import Picamera2

# --- Tunables --------------------------------------------------------------
MOTION_THRESHOLD = 5000   # changed pixels to flag movement
EARLY_COOLDOWN   = 1.0    # s, ignore motion events until this passes
# --------------------------------------------------------------------------

# Initialize camera
picam = Picamera2()
picam.configure(picam.create_preview_configuration(main={'size': (640, 480), 'format': 'BGR888'}))
picam.start()
time.sleep(2)  # warm‑up

prev_gray = None
last_event = 0

# Load Haar cascades
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
eye_cascade  = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_eye.xml')

print("[CAM] Running. Press 'q' in the preview window to quit.")

try:
    while True:
        frame = picam.capture_array()
        gray  = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        gray  = cv2.GaussianBlur(gray, (21, 21), 0)

        # ----- Motion detect by frame differencing --------------------------
        if prev_gray is None:
            prev_gray = gray
            continue

        frame_delta = cv2.absdiff(prev_gray, gray)
        thresh      = cv2.threshold(frame_delta, 25, 255, cv2.THRESH_BINARY)[1]
        diff_pixels = cv2.countNonZero(thresh)

        if diff_pixels > MOTION_THRESHOLD and (time.time() - last_event) > EARLY_COOLDOWN:
            print(f"[{time.strftime('%H:%M:%S')}] Movement detected (pixels={diff_pixels})")
            last_event = time.time()
        prev_gray = gray

        # ----- Face / eye detect -------------------------------------------
        faces = face_cascade.detectMultiScale(gray, 1.1, 5)
        for (x,y,w,h) in faces:
            cv2.rectangle(frame, (x,y), (x+w, y+h), (0,255,0), 2)
            roi_gray  = gray[y:y+h, x:x+w]
            roi_color = frame[y:y+h, x:x+w]
            eyes = eye_cascade.detectMultiScale(roi_gray, 1.1, 5)
            for (ex,ey,ew,eh) in eyes:
                cv2.rectangle(roi_color, (ex,ey), (ex+ew, ey+eh), (255,0,0), 2)

        cv2.imshow('Sensors preview', frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

finally:
    picam.close()
    cv2.destroyAllWindows()
