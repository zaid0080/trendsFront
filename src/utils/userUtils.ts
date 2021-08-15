export async function GetUserLocation():Promise<string> {
    try {
        const resp = await fetch("https://ipapi.co/json/", {
            method: "GET",
        });
        const data = await resp.json();
        console.log(resp)
        return data.country_name;
    } catch (error) {
        return "Worldwide";
    }
}