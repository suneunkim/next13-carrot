export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-8 min-w-max">
      <div className="w-full flex items-center justify-between h-80 bg-yellow-200 relative">
        <div className="w-66 p-20">
          <h2 className="font-bold text-4xl">이웃 간 중고거래</h2>
          <p className="font-medium py-5">
            동네 주민들과 손쉽게 <br />
            거래하기는 당근!
          </p>
        </div>
        <img
          className=" h-full object-contain absolute right-0 md:flex hidden"
          alt="믿을만한 이웃 간 중고거래"
          src="https://d1unjqcospf8gs.cloudfront.net/assets/home/main/3x/fleamarket-39d1db152a4769a6071f587fa9320b254085d726a06f61d544728b9ab3bd940a.webp"
        />
      </div>
    </main>
  );
}
