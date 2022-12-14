export const fileUpload = async (file) => {
    if(!file) throw new Error('No file to upload');
    
    const cloudUrl = 'https://api.cloudinary.com/v1_1/jorgeimgcloud/upload';

    const formData = new FormData();
    formData.append('upload_preset','nuevo-reporte');
    formData.append('file',file);

    try {
        const resp = await fetch( cloudUrl, {
            method: 'POST',
            body: formData
        });
        
        if(!resp.ok) throw new Error('File cant be uploaded');

        const cloudResp = await resp.json();
        return cloudResp.secure_url;

    } catch (error) {
        console.log(error);
        throw new Error( error.message);
    }



}