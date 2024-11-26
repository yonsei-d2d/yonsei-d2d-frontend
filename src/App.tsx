import styled from 'styled-components';
import SearchBar from './components/search/SearchBar';
import Map from './components/map/Map';
import BottomSheet from './components/bottom-sheet/BottomSheet';
import { MapProvider } from './contexts/MapContext';
import { SheetProvider } from './contexts/SheetContext';

const AppContainer = styled.div`
  width: 100%;
  height: 100dvh;
  overflow: hidden;
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  top: 0;
  left: 0;
`;

function App() {
  return (
    <MapProvider>
      <AppContainer>
        <SheetProvider>
          <SearchBar />
          <Map />
          <BottomSheet />
        </SheetProvider>
      </AppContainer>
    </MapProvider>
  );
}

export default App;
