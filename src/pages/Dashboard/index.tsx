import Collumns from './components/Columns';
import { SearchBar } from './components/Searchbar';
import * as S from './styles';

const DashboardPage = () => {
	return (
		<S.Container>
			<SearchBar />
			<Collumns registrations={[]} />
		</S.Container>
	);
};
export default DashboardPage;
