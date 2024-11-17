import PageTemplate from "./PageTemplate";

function Home() {
  return (
    <PageTemplate>
      <div className="w-full flex flex-col">
        <GameCard game={{}} />
      </div>
    </PageTemplate>
  );
}

export default Home;

function GameCard({ game }) {
  return (
    <div className="flex flex-col w-1/3 p-4">
      <div className="bg-gray-800 rounded-lg p-4">
        <h1 className="text-white text-2xl font-bold">{game.title}</h1>
        <p className="text-white">{game.description}</p>
      </div>
    </div>
  );
}
