import cv2
import numpy as np
import os
import pickle

# Path ke dataset
dataset_path = 'dataset'

# Inisialisasi pengenal wajah (Face Recognizer)
recognizer = cv2.face.LBPHFaceRecognizer_create()

# Fungsi untuk mendapatkan data dan label dari folder dataset
def get_images_and_labels(dataset_path):
    image_paths = []
    for root, dirs, files in os.walk(dataset_path):
        for file in files:
            if file.endswith("jpg") or file.endswith("png"):
                image_paths.append(os.path.join(root, file))

    face_samples = []
    face_labels = []
    label_dict = {}
    label_id = 0

    for image_path in image_paths:
        img = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
        label = os.path.basename(os.path.dirname(image_path))

        if label not in label_dict:
            label_dict[label] = label_id
            label_id += 1

        face_samples.append(img)
        face_labels.append(label_dict[label])

    return face_samples, face_labels, label_dict

faces, labels, label_dict = get_images_and_labels(dataset_path)

recognizer.train(faces, np.array(labels))

# Simpan model yang sudah dilatih
recognizer.save('face_recognizer.yml')

# Simpan label ke dalam file
with open('labels.pickle', 'wb') as f:
    pickle.dump(label_dict, f)

print("Model dan label berhasil disimpan.")
