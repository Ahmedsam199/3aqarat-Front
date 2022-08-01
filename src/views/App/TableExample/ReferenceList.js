// Joseph : Look at findRate functino please

import { sleep, toBoolean } from '@utils';
import { ErrorMessage } from 'components/ErrorMessage';
import CustomFormNumberInput from 'components/Form/CustomFormNumberInput';
import CustomFormSelect from 'components/Form/CustomFormSelect';
import { useRef } from 'react';
import { Plus, Trash2 } from 'react-feather';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { Button, Col, Row, Table } from 'reactstrap';
const RefsList = ({ loading }) => {
  const ref = useRef();
  const {
    control,
    register,
    getValues,
    setValue,
    formState: { errors },
    reset,
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'Reference',
  });
  return (
    <>
      <h5 className="mb-1 text-center">
        <FormattedMessage id="Reference" />
      </h5>
      <div className={`shadow rounded table-container`}>
        <Table borderless striped>
          <thead>
            <tr>
              <th style={{ width: '5%' }}>#</th>
              <th style={{ width: '30%' }}>
                <FormattedMessage id="Currency" />
              </th>
              <th style={{ width: '25%' }}>
                <FormattedMessage id="Amount" />
              </th>
              <th style={{ width: '25%' }}>
                <FormattedMessage id="Rate" />
              </th>
              <th style={{ width: '10%' }}>
                <FormattedMessage id="Actions" />
              </th>
            </tr>
          </thead>
          <tbody {...{ ref }}>
            {fields.map((x, index) => {
              return (
                <div key={x.id}>
                  <tr>
                    <th style={{ width: '5%' }} scope="row">
                      {index + 1}
                    </th>
                    <td style={{ width: '30%' }}>
                      <CustomFormSelect
                        menuPosition={'fixed'}
                        menuShouldBlockScroll
                        autoFocus={index === fields.length - 1}
                        hiddenTitle
                        name={`Reference.${index}.currencySeries`}
                        options={[]}
                        valueName="Series"
                        textName="Currency"
                      />
                    </td>
                    <td style={{ width: '25%' }}>
                      <CustomFormNumberInput
                        name={`Reference.${index}.amount`}
                        hiddenTitle
                      />
                    </td>
                    <td style={{ width: '25%' }}>
                      <CustomFormNumberInput
                        name={`Reference.${index}.rate`}
                        IsDisabled={true}
                        hiddenTitle
                      />
                    </td>
                    <td style={{ width: '10%' }}>
                      <Button.Ripple
                        className="btn-icon"
                        color="flat-danger"
                        onClick={async () => {
                          await Promise.all([
                            refreshPaidAmount(null, index),
                            deleteOptions(index),
                            remove(index),
                          ]);
                        }}
                      >
                        <Trash2 size="15" />
                      </Button.Ripple>
                    </td>
                  </tr>
                  <input
                    className="d-none"
                    defaultValue={x.id ?? ''}
                    {...register(`Items.${index}.id`)}
                  />
                </div>
              );
            })}
          </tbody>
        </Table>
      </div>
      <Row>
        <Col>
          <small className="my-1 text-danger d-block">
            <ErrorMessage error={errors[`Reference`]?.message} />
            <ul>
              {Array.isArray(errors[`Reference`]) &&
                errors[`Reference`].map((x, i) =>
                  Object.keys(x)?.map((e) => (
                    <li>
                      <ErrorMessage
                        arrayName="Reference"
                        index={i}
                        propName={e}
                        error={x[e]?.message}
                      />
                    </li>
                  ))
                )}
            </ul>
          </small>
          {toBoolean(_dataFormWatch._write) && (
            <Button.Ripple
              className="btn-icon"
              color="success"
              onClick={() => {
                append({});
                // wait until add the row then scroll to down
                sleep(100).then(
                  () => (ref.current.scrollTop = ref.current.scrollHeight)
                );
              }}
            >
              <Plus size={14} />
            </Button.Ripple>
          )}
        </Col>
      </Row>
    </>
  );
};

export default RefsList;
