import {atom, selector, useRecoilState} from "recoil";

export const schulteTableGridSizeAtom = atom({
    key: 'schulteTableGridSize',
    default: 5,
});

export const modalStateAtom = atom({
    key: 'modalStateAtom',
    default: true,
});

export const testStartedAtom = atom({
    key: 'testStartedAtom',
    default: false,
});

export const testEndedAtom = atom({
    key: 'testEndedAtom',
    default: false,
});

export const startTimeAtom = atom({
    key: 'startTime',
    default: new Date(),
});

export const endTimeAtom = atom({
    key: 'endTimeAtom',
    default: new Date(),
});

export const useModalState = (): ReturnType<typeof useRecoilState<boolean>> => {
    return useRecoilState(modalStateAtom);
}

export const useSchulteTableGridSize = (): ReturnType<typeof useRecoilState<number>> => {
    return useRecoilState(schulteTableGridSizeAtom);
}

export const lastTableNumberSelector = selector({
    key: 'lastTableNumber',
    get: ({get}) => {
        const gridSize = get(schulteTableGridSizeAtom);

        return gridSize ** 2;
    },
});

export const testDurationSelector = selector({
    key: 'testDuration',
    get: ({get}) => {
        const startTime = get(startTimeAtom);
        const endTime = get(endTimeAtom);

        return new Date(endTime.getTime() - startTime.getTime());
    },
});