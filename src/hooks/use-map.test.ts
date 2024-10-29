import {renderHook} from '@testing-library/react';
import useMap from './use-map';
import { makeFakeCity } from '../utils/moks';
//import {render, screen} from '@testing-library/react';
import {useRef} from 'react';
describe('Hook: useMap', () => {

  it('should be correctly change state', () => {
    const fakeCity = makeFakeCity();
    //vi.mock('leaflet');
    const { result } = renderHook(() => useMap(useRef(null), fakeCity));
    //screen.debug();
    expect(result.current).toEqual(null);
  });
});
