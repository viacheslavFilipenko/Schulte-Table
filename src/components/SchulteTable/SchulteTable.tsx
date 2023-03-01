import React, {useEffect, useState} from "react";
import {SchulteTableCell} from "./SchulteTableCell/SchulteTableCell";
import {
    endTimeAtom,
    lastTableNumberSelector, startTimeAtom, testEndedAtom,
    testStartedAtom,
    useSchulteTableGridSize
} from "./SchulteTable.atom";
import {useRecoilState, useRecoilValue} from "recoil";

function shuffle<T>(array: T[]): T[]{
    let currentIndex = array.length;
    let randomIndex: number;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
}

function listToMatrix(list: number[], elementsPerSubArray: number) {
    let matrix: number[][] = [];

    for (let i = 0, k = -1; i < list.length; i++) {
        if (i % elementsPerSubArray === 0) {
            k++;
            matrix[k] = [];
        }

        matrix[k].push(list[i]);
    }

    return matrix;
}

const generateSchulteTable = (gridSize: number): number[][] => {
    const numbersLimit = gridSize ** 2;

    const numbers = new Array(numbersLimit)
        .fill(null)
        .map((_value, index) => index + 1);

    return listToMatrix(shuffle(numbers), gridSize);
};

 const useTestEnd = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isTestStarted, setIsTestStarted] = useRecoilState(testStartedAtom);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [endTime, setEndTime] = useRecoilState(endTimeAtom);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isTestEnded, setIsTestEnded] = useRecoilState(testEndedAtom);


    return () => {
        setIsTestStarted(false);
        setEndTime(new Date());
        setIsTestEnded(true);
    }
}

export const SchulteTable = () => {
    const [gridSize] = useSchulteTableGridSize();
    const lastTableNumber = useRecoilValue(lastTableNumberSelector);
    const startTime=  useRecoilValue(startTimeAtom);
    const endTest = useTestEnd();
    const [schulteTable, setSchulteTable] = useState(generateSchulteTable(gridSize));

    useEffect(() => {
        if (startTime) {
            setSchulteTable(generateSchulteTable(gridSize));
        }
    }, [startTime]);

    let currentNumberTarget = 1;

    const handleClick = (countNumber: number) => {
        const isMatched = countNumber === currentNumberTarget;

        if (isMatched) {
            currentNumberTarget += 1;

            if (lastTableNumber === countNumber) {
                endTest();
            }
        }

        return isMatched;
    };

    return (<div className="schulte-table">
        {schulteTable.map(numbers => {
            return <div className="row">
                {numbers.map(countNumber => <SchulteTableCell key={countNumber} onClick={handleClick} countNumber={countNumber} />)}
            </div>
        })}
    </div>);
};