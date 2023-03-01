import React from "react";
import {
    startTimeAtom,
    testEndedAtom,
    testStartedAtom,
    useModalState,
    useSchulteTableGridSize
} from "../SchulteTable.atom";
import {Box, Button, FormControl, MenuItem, Modal, Select, Typography} from "@mui/material";
import {useRecoilState} from "recoil";

const gridSizeOptions = [
    {
        value: 2,
        label: '2x2',
    },
    {
        value: 3,
        label: '3x3',
    },
    {
        value: 4,
        label: '4x4',
    },
    {
        value: 5,
        label: '5x5',
    },
    {
        value: 6,
        label: '6x6',
    },
    {
        value: 7,
        label: '7x7',
    },
    {
        value: 8,
        label: '8x8',
    },
    {
        value: 9,
        label: '9x9',
    },
    {
        value: 10,
        label: '10x10',
    }
]

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

export const Settings = () => {
    const [gridSize, setGridSize] = useSchulteTableGridSize();
    const [modalOpen, setModalOpen] = useModalState();
    const startTest = useStartTest();

    return <Modal open={modalOpen}>
        <Box sx={style}>
            <Typography style={{ textAlign: "center", marginBottom: 30 }} variant="h4">
                Schulte Table Test
            </Typography>
            <FormControl style={{ marginBottom: 40 }} fullWidth>
                <Select
                    value={gridSize}
                    onChange={(event) => setGridSize(event.target.value as number)}
                >
                    {gridSizeOptions.map(({value, label}) => {
                        return <MenuItem value={value}>{label}</MenuItem>
                    })}
                </Select>
            </FormControl>
            <Button fullWidth={true} onClick={() => {
                setModalOpen(false);
                startTest();
            }} variant="outlined">
                Start Test
            </Button>
        </Box>
    </Modal>;
};