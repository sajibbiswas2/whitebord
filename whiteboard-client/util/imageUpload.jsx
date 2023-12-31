export const imageUpload = async (image) => {
    //  image upload in image bb......
    const formData = new FormData();
    formData.append("image", image);

    const url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY
        }`;

    const response = await fetch(url, {
        method: "POST",
        body: formData,
    });
    const result = await response.json();
    const imageUrl = result?.data?.display_url;
    return imageUrl
}