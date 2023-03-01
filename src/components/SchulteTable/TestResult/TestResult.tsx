import React from 'react';
import {Box, Button, FormControl, MenuItem, Modal, Select, Typography} from "@mui/material";
import {useRecoilState, useRecoilValue} from "recoil";
import {startTimeAtom, testDurationSelector, testEndedAtom, testStartedAtom} from "../SchulteTable.atom";

export const useStartTest = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isTestStarted, setIsTestStarted] = useRecoilState(testStartedAtom);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isTestEnded, setIsTestEnded] = useRecoilState(testEndedAtom);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [startTime, setStartTime] = useRecoilState(startTimeAtom);

    return () => {
        setIsTestEnded(false);
        setIsTestStarted(true);
        setStartTime(new Date());
    };
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    outline: 'none',
    boxShadow: 24,
    p: 4,
};

export const TestResult = () => {
    const isTestEnded = useRecoilValue(testEndedAtom);
    const testDuration = useRecoilValue(testDurationSelector);
    const startTest = useStartTest();

    return <Modal open={isTestEnded}>
        <Box sx={style}>
            <Typography style={{ textAlign: "center", marginBottom: 30 }} variant="h4">
                Schulte Table Test Result
            </Typography>
            <Typography style={{ textAlign: "center", marginBottom: 30 }} variant="h4">
               Time: { testDuration.toISOString().substring(11, 19) }
            </Typography>
            <Button  fullWidth={true} onClick={() => startTest()} variant="outlined">
                Retake Test
            </Button>
        </Box>
    </Modal>;
};