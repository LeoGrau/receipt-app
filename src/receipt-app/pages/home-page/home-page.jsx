import "./home-page.css"

function HomePage() {
  const user = JSON.parse(localStorage.getItem("user"));
  const completeName = user.firstname + " " + user.lastname;

  return (
    <div className="home-page flex justify-content-center align-items-center" style={{ height: "100vh"}}>
      <div>Hola {completeName}</div>
    </div>
  );
}

export { HomePage };
