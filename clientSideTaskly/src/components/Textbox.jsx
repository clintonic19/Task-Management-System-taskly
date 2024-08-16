import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const Textbox = React.forwardRef(({
    type, placeholder, label, className, register, name, error }, ref) => {

    return (
        <div className='w-full flex flex-col gap-1'>
            {label && (<label htmlFor={name} className='text-sm text-gray-500'>{label}</label>)}

            <div>
                <input
                    type={type}
                    placeholder={placeholder}
                    name={name}
                    ref={ref}
                    {...register}
                    aria-invalid={error ? "true" : "false"}
                    className={clsx("bg-transparent px-3 py-2.5 2xl:py-3 border border-gray-300 placeholder-gray-300 text-gray-900 outline-none text-base focus:ring-2 ring-orange-300", className)}
                />
            </div>
            {error && (<span className='text-red-500 text-sm'>{error}</span>)}
        </div>
    );
});

Textbox.propTypes = {
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    className: PropTypes.string,
    register: PropTypes.object,
    name: PropTypes.string.isRequired,
    error: PropTypes.string,
};

Textbox.displayName = 'Textbox';

export default Textbox;
