import { Button, buttonVariants } from "@/components/ui/button";

export default async function Home() {
  return (
    <div className="flex items-center justify-center my-4">
      <div className="w-full max-w-[90vw] rounded-[24px] bg-secondary container py-4 pb-12">
        <h3 className="text-3xl leading-tight my-8 lg:my-16">
          PoL Creator Platform
        </h3>

        {/* <div></div> */}
        <h1 className="font-semibold text-5xl lg:text-7xl leading-tight my-16">
          Build the next interactive web3
          course on Proof of Learn
        </h1>

        <div className="flex items-center gap-2">
          <a href="/quest" className={buttonVariants({ size: "xl", variant: "outline" })}>
            Get Started
          </a>
          <a href="https://pol.solide0x.tech/" className={buttonVariants({ size: "xl" })}>
            Visit Dapp
          </a>
        </div>
      </div>
    </div>

  )
}
