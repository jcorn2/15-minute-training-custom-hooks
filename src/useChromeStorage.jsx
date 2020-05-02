/* global chrome */
import { useEffect, useState } from 'react';

function createInitialValue(fieldsArray) {
    const initialValues = fieldsArray.reduce((acc, cur) => {
        acc[cur] = null;
        return acc;
    }, {});

    return initialValues;
}

function useChromeStorage(fields) {
    const [fieldsArray, setFieldsArray] = useState(Array.isArray(fields) ? fields : [fields]);
    const [data, setData] = useState(createInitialValue(fieldsArray));

    useEffect(() => {
        chrome.storage.local.get(fields, (result) => {
            setData(result)
        });
    }, [fields]);

    chrome.storage.onChanged.addListener((changes) => {
        const fieldsChanged = Object.keys(changes).filter((field) => fieldsArray.includes(field));

        if (!fieldsChanged.length) return;

        setData((prevData) => {
            const newValues = fieldsChanged.reduce((acc, cur) => {
                acc[cur] = changes[cur].newValue;
                return acc;
            }, {});
            return { ...prevData, ...newValues };
        });
    });

    return data;
}

export default useChromeStorage;
