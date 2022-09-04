import CustomFormSelect from '@Component/Form/CustomFormSelect';
import { Tables } from '@FixedOptions';
import { t } from 'i18next';
import { useEffect, useMemo, useState } from 'react';
import { Controller, FormProvider, useForm, useWatch } from 'react-hook-form';
import Select from 'react-select';
import {
    Button, Card, CardBody, CardFooter, Form, Label, Modal
} from 'reactstrap';
import { getTablesMap } from './utils';

const POST = ({ onToggle, row, onComplete, Doctype }) => {
    const TableOptions = useMemo(() => Tables[Doctype], [Doctype])
    const methods = useForm({ defaultValues: { _write: true } });
    const { reset, register, formState: { errors }, control, handleSubmit, getValues, setValue } = methods
    const _dataForm = useWatch({ control })
    const currentTables = useMemo(() => row ? getTablesMap(row) : null, [row])
    const [modal, setModal] = useState(false);
    useEffect(() => {
        if (row != undefined) {
            setModal(true);
        }
    }, [row]);
    const toggle = () => {
        setModal(!modal);
        reset({ name: null, attributes: null })
        onToggle();
    };
    const onSubmit = async (values) => {
        values.attributes = values.attributes.map(x => x.value)
        onComplete({ ...values, old: !!currentTables?.[values.name] })
        toggle()
    }
    const changeTable = () => {
        setValue("attributes", currentTables?.[getValues("name")] ?? null)
    }
    return (
        <>
            <Modal isOpen={modal} centered size="lg" toggle={toggle}>
                <FormProvider {...methods}>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Card>
                            <CardBody>
                                <CustomFormSelect options={TableOptions} name="name" extraOnChangeFun={changeTable} />
                                <Label>{t('attributes')}</Label>
                                <Controller
                                    control={control}
                                    name={"attributes"}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            className={"react-select"}
                                            classNamePrefix="select"
                                            options={TableOptions?.find(x => x.value == _dataForm.name)?.attributes}
                                            isMulti={true}
                                        />
                                    )}
                                />

                            </CardBody>
                            <CardFooter className="d-flex justify-content-around align-items-center">
                                <Button color="primary" type="submit" className="mr-1">
                                    {t("Save")}
                                </Button>
                                <Button color="secondary" onClick={toggle}>
                                    {t("Cancel")}
                                </Button>
                            </CardFooter>
                        </Card>
                        <input type="hidden" {...register('_write')} />
                    </Form>
                </FormProvider>

            </Modal>
        </>
    );
};

export default POST;
