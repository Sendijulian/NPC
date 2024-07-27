import cv2
import numpy as np
import urllib.request
import pyrebase
import datetime

# Konfigurasi Firebase
config = {
    "apiKey": "AIzaSyBVmmzs8N58odYefKVzSSLgQIu8sBPhM24",
    "authDomain": "warsafe-bcab4.firebaseapp.com",
    "projectId": "warsafe-bcab4",
    "storageBucket": "warsafe-bcab4.appspot.com",
    "messagingSenderId": "307082252290",
    "appId": "1:307082252290:web:4d0009801ca3f32552171b",
    "databaseURL": "https://warsafe-bcab4-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

# Inisialisasi Pyrebase
firebase = pyrebase.initialize_app(config)
db = firebase.database()
storage = firebase.storage()

# YOLOv3 Configuration
url = 'http://172.16.1.106/cam-hi.jpg'
whT = 320
confThreshold = 0.5
nmsThreshold = 0.3
classesfile = 'coco.names'
classNames = []

# Load class names
with open(classesfile, 'rt') as f:
    classNames = f.read().rstrip('\n').split('\n')

modelConfig = 'yolov3.cfg'
modelWeights = 'yolov3.weights'
net = cv2.dnn.readNetFromDarknet(modelConfig, modelWeights)
net.setPreferableBackend(cv2.dnn.DNN_BACKEND_OPENCV)
net.setPreferableTarget(cv2.dnn.DNN_TARGET_CPU)

def findObject(outputs, im):
    global person_count
    hT, wT, cT = im.shape
    bbox = []
    classIds = []
    confs = []
    for output in outputs:
        for det in output:
            scores = det[5:]
            classId = np.argmax(scores)
            confidence = scores[classId]
            if confidence > confThreshold and classNames[classId] == 'person':
                w, h = int(det[2] * wT), int(det[3] * hT)
                x, y = int((det[0] * wT) - w / 2), int((det[1] * hT) - h / 2)
                bbox.append([x, y, w, h])
                classIds.append(classId)
                confs.append(float(confidence))
    
    indices = cv2.dnn.NMSBoxes(bbox, confs, confThreshold, nmsThreshold)
    
    if len(indices) > 0:
        if isinstance(indices[0], list):
            indices = indices.flatten().tolist()

        for i in indices:
            box = bbox[i]
            x, y, w, h = box[0], box[1], box[2], box[3]
            cv2.rectangle(im, (x, y), (x + w, y + h), (255, 0, 255), 2)
            cv2.putText(im, f'{classNames[classIds[i]].upper()} {int(confs[i] * 100)}%', (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 0, 255), 2)
            person_count += 1
            # Save detected image
            if classNames[classIds[i]] == 'person':
                timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
                image_path = f"detected_{timestamp}.jpg"
                cv2.imwrite(image_path, im)
                storage.child(f"images/{image_path}").put(image_path)
                print(f"Image {image_path} has been uploaded to Firebase Storage.")

while True:
    img_resp = urllib.request.urlopen(url)
    imgnp = np.array(bytearray(img_resp.read()), dtype=np.uint8)
    im = cv2.imdecode(imgnp, -1)
    blob = cv2.dnn.blobFromImage(im, 1 / 255, (whT, whT), [0, 0, 0], 1, crop=False)
    net.setInput(blob)
    layernames = net.getLayerNames()
    outputNames = [layernames[i - 1] for i in net.getUnconnectedOutLayers()]

    outputs = net.forward(outputNames)

    person_count = 0
    findObject(outputs, im)

    # Send person count to Firebase Realtime Database
    data = {"person_count": person_count, "timestamp": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")}
    db.child("person_count").push(data)
    print(f'Person count: {person_count}')
    
    cv2.imshow('Image', im)
    
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cv2.destroyAllWindows()
