import Router from '@/router';

import { Header } from './components/Header';
import { ReactQueryProvider } from './libs/ReactQueryProvider';

function App() {
	return (
		<ReactQueryProvider>
			<Header>
				<h1>Caju Front Teste</h1>
			</Header>

			<Router />
		</ReactQueryProvider>
	);
}

export default App;
