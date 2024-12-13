import PropTypes from 'prop-types';

export default function GeneralCard({ title, button, children }) {
    return (
        <div className="bg-white shadow-lg rounded-lg">
            {/* Card Header */}
            <div
                className="text-white bg-gray-700 flex justify-between items-center p-2 rounded-t-lg"
            >
                <div className='text-white font-bold text-base'>
                    {title}
                </div>
                {button}
            </div>

            {/* Card Content */}
            {children}
        </div>
    );
}

GeneralCard.propTypes = {
    title: PropTypes.string.isRequired,
    button: PropTypes.element,
    children: PropTypes.element.isRequired,
};

GeneralCard.defaultProps = {
    button: null,
}