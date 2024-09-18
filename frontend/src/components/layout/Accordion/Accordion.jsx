import React from 'react';
import { Envelope } from '@phosphor-icons/react';

const Accordion = () => {
  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Header */}
      <div className='text-center mb-8'>
        <h2 className='text-3xl font-bold'>
          Got questions? <br /> We got answers!
        </h2>
      </div>

      {/* Accordion Items */}
      <div className='border rounded-md shadow-md divide-y'>
        {/* Accordion Item 1 */}
        <div className='cursor-pointer'>
          <div className='px-6 py-4 text-lg font-semibold hover:bg-gray-100'>
            What is BackInGame?
          </div>
          <div className='px-6 py-4 text-sm bg-gray-50'>
            It is an online shop where you can buy pre-owned games at a
            reasonable price.
          </div>
        </div>

        {/* Accordion Item 2 */}
        <div className='cursor-pointer'>
          <div className='px-6 py-4 text-lg font-semibold hover:bg-gray-100'>
            Is there an iOS/Android app?
          </div>
          <div className='px-6 py-4 text-sm bg-gray-50'>
            Yes! BackInGame is available on iOS & Android phones. You can also
            sign-up here and download the app later!
          </div>
        </div>

        {/* Accordion Item 3 */}
        <div className='cursor-pointer'>
          <div className='px-6 py-4 text-lg font-semibold hover:bg-gray-100'>
            Are gaming consoles also available?
          </div>
          <div className='px-6 py-4 text-sm bg-gray-50'>
            Not yet, but we are soon bringing those as well.
          </div>
        </div>

        {/* Accordion Item 4 */}
        <div className='cursor-pointer'>
          <div className='px-6 py-4 text-lg font-semibold hover:bg-gray-100'>
            The feature I want is not in the app...
          </div>
          <div className='px-6 py-4 text-sm bg-gray-50'>
            Let's make it real! Submit it in the feedback box, and there's a
            chance it will be in BackInGame soon.
          </div>
        </div>
      </div>

      {/* Feedback Section */}
      <div className='mt-12 bg-gray-100 p-6 text-center rounded-md shadow-md'>
        <h2 className='text-3xl font-bold'>Feedback</h2>
        <p className='mt-4'>
          We are always looking to improve. Leave feedback or suggest a feature.
        </p>
        <div className='mt-6'>
          <a href='mailto:deepakthapa1423@gamil.com'>
            <button className='flex items-center bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-500'>
              <Envelope size={20} />
              <span className='ml-2'>Mail Us</span>
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
