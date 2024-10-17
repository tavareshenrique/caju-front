import { Helmet } from 'react-helmet';
import { Toaster } from 'react-hot-toast';

import Router from '@/router';

import { Header } from './components/atoms/Header';
import { ReactQueryProvider } from './libs/ReactQueryProvider';

function App() {
	return (
		<>
			<Helmet>
				<meta charSet="utf-8" />
				<title>Caju</title>
				<meta
					name="description"
					content="Página interno da Caju para registros de candidatos."
				/>
				<link rel="canonical" href="https://registros-caju.vercel.app" />
			</Helmet>

			<Header>
				<img src="/assets/images/caju.png" alt="" height={48} width={32} />

				<h1>Caju - Registro de Candidatos</h1>
			</Header>

			<ReactQueryProvider>
				<Router />
			</ReactQueryProvider>

			<Toaster position="bottom-center" />
		</>
	);
}

export default App;
