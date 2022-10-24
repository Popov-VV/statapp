import { SenderInterface, SenderFunction } from "../interfaces/sender";

class ApiService implements SenderInterface {
  send: SenderFunction = async (events) => {
    const response = await window.fetch("http://localhost:8001/track", {
      method: "POST",
      headers: {
        "content-type": "text/plain;charset=UTF-8",
      },
      body: JSON.stringify(events),
    });

    const body = await response.text();

    if (body === "success") {
      return body;
    } else {
      throw new Error(body);
    }
  };
}

export { ApiService };
