import { LinksListContainer } from '../components/links-list-container'
import { NewLinkContainer } from '../components/new-link-container'

export function Home() {
  return (
    <div className="min-h-screen w-[94%] max-w-[980px] mx-auto py-[88px] max-md:py-8">
      <div className="flex justify-start max-md:justify-center mb-8 max-md:mb-6">
        <img src="/logo.png" className="w-[96px]" alt="Logo" />
      </div>

      <div className="flex gap-5 max-md:gap-3 max-md:flex-col items-start">
        <NewLinkContainer />

        <LinksListContainer />
      </div>
    </div>
  )
}
