import api from "./api";

// TODO: paginate response
export const downloadAllFiles = () => {
    return api.get("/file/all");
};

export const downloadFile = (fileId: string) => {
  return api.get(`/file/${fileId}`);
};

export const uploadFile = (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
  
    return api.post(`/file`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

export const deleteFile = (fileId: string) => {
  return api.delete(`/file/${fileId}`);
};