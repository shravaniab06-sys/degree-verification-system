import axios from "axios";

const API_URL = "http://localhost:8000";

export async function uploadDegreePDF({
  studentId,
  studentName,
  degreeTitle,
  file
}) {
  const formData = new FormData();

  formData.append(
    "studentId",
    studentId
  );

  formData.append(
    "studentName",
    studentName
  );

  formData.append(
    "degreeTitle",
    degreeTitle
  );

  formData.append(
    "file",
    file
  );

  const response = await axios.post(
    `${API_URL}/upload-degree`,
    formData
  );

  return response.data;
}