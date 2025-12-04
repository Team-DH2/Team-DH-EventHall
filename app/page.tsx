"use client";
export default function Home() {
  const checkBackend = async () => {
    try {
      const result = await fetch("http://localhost:3000/hello", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await result.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        window.location.reload();
      }
    } catch (e) {
      console.log(`Failed to connect to the server.${e}`);
    }
  };

  return (
    <div>
      <button className="bg-white" onClick={checkBackend}>
        button
      </button>
    </div>
  );
}
