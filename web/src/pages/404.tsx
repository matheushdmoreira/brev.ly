import { Link } from 'react-router'

export function NotFound() {
  return (
    <div className="flex h-screen items-center justify-center p-5">
      <div className="flex flex-col gap-6 items-center justify-center bg-gray-100 px-12 py-16 rounded-xl">
        <img src="/not-found.png" className="w-[194px]" alt="Not Found" />

        <h1 className="text-xl text-gray-600 font-bold">Link não encontrado</h1>

        <p className="text-center font-semibold max-w-[488px] text-md text-gray-500">
          O link que você está tentando acessar não existe, foi removido ou é
          uma URL inválida. Saiba mais em{' '}
          <Link to="/" className="text-blue-base hover:text-blue-dark">
            brev.ly
          </Link>{' '}
          .
        </p>
      </div>
    </div>
  )
}
