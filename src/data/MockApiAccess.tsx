import AppData from "../../AppData.json";

async function mockData(isOnLocation: boolean): Promise<any> {
    console.log("entering POST function");
    let url: URL = new URL("is_on_location", AppData.mockAddress);
    let headers = {
        "Content-Type": "application/json"
    };
    let body = JSON.stringify({
        "receiver_name": "Art Nooijen",
        "receiver_id": "653fad3009ae93a5292195d4",
        "is_on_location": isOnLocation.toString()
    });

    console.log('Making request to URL:', url.toString());
    console.log('Request headers:', headers);
    console.log('Request body:', body);

    let response: Response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: body
    });

    if (!response.ok) {
        console.error('Response error status:', response.status);
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log('Response status:', response.status);
    return response.json();
}

export default mockData;
