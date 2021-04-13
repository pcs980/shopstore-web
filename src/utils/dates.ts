import {
  formatRFC7231,
  isBefore as dtfnsIsBefore,
} from 'date-fns';

const formatDate = (date: Date | string | undefined): string => {
  if (!date) {
    return '';
  }

  return formatRFC7231(new Date(date));
};

const isBefore = (first: Date | undefined, second: Date | undefined): boolean => {
  return dtfnsIsBefore(first || new Date(), second || new Date());
};

export {
  formatDate,
  isBefore,
};
