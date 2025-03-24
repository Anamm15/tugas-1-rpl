import PropTypes from 'prop-types'

function CurrencyFormatter(props) {
    const { amount, className } = props;
    const formatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0, 
    });
  
    const formattedAmount = formatter.format(amount);
  
    return <div className={className}>{formattedAmount}</div>;
  }
  
CurrencyFormatter.propTypes = {
  amount: PropTypes.number,
  className: PropTypes.string
}

export default CurrencyFormatter;