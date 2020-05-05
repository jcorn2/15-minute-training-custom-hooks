import { renderHook } from '@testing-library/react-hooks';
import useFetch from './useFetch';

const mockSuccessResponse = { key: 'some data'};
const mockJsonPromise = Promise.resolve(mockSuccessResponse); // 2
const mockFetchPromise = Promise.resolve({ // 3
    json: () => mockJsonPromise,
});
const fetchSpy = jest.spyOn(global, 'fetch'); 

describe(' useFetch tests', () => {
    it('initial state', () => {
        const { result } = renderHook(() => useFetch('https://example.com'));
        expect(result.current.data).toBeNull();
        expect(result.current.loading).toEqual(true);
    });

    it('after loading', async () => {
        fetchSpy.mockImplementationOnce(() => mockFetchPromise)
        const { result, waitForNextUpdate } = renderHook(() => useFetch('https://example.com'));
        await waitForNextUpdate();

        expect(result.current.data).toEqual({ key: 'some data'});
        expect(result.current.loading).toEqual(false);
    });
});
