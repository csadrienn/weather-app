import React from "react";
import { Header, Current, DaySection, HourSection, Loading, Error } from "./components";
import { useWeatherContext } from "./context";

function App() {
  const { loading, error } = useWeatherContext();

  if (loading) {
    return (
      <>
        <Header />
        <Loading />
      </>
    );
  }

  if (error.error) {
    return (
      <>
        <Header />
        <Error msg={error.msg} />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="home">
        <div className="main-content">
          <Current />
          <DaySection />
          <HourSection />
        </div>
      </main>
    </>
  );
}

export default App;
