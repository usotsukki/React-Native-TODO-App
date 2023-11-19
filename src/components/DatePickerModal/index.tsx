import React from 'react';
import DateTimePickerModal, {
  DateTimePickerProps,
} from 'react-native-modal-datetime-picker';

interface Props {
  date: Date;
  visible: boolean;
  mode: DateTimePickerProps['mode'];
  onChangeDate: (date: Date) => void;
  closeModal: () => void;
}

export default ({
  date,
  visible,
  mode,
  onChangeDate,
  closeModal,
  ...props
}: Props & Partial<DateTimePickerProps>) => {
  return (
    <DateTimePickerModal
      {...props}
      isVisible={visible}
      date={date}
      mode={mode}
      onConfirm={dateTime => {
        closeModal();
        onChangeDate(dateTime);
      }}
      onCancel={() => {
        closeModal();
      }}
      is24Hour
      locale="en_GB"
    />
  );
};
