import React from 'react';
import { Envelope } from '@phosphor-icons/react';

const Accordion = () => {
  return (
    <div>
      <div className='text-center'>
        <h2 className='flex flex-col font-bold text-4xl'>
          <span>Got questions?</span>
          <span>we got answers!</span>
        </h2>
      </div>
      <br />
      <br />
      <div className='join join-vertical w-full '>
        <div className='collapse collapse-arrow join-item '>
          <input
            type='radio'
            name='my-accordion-4'
            defaultChecked
          />
          <div className='collapse-title text-md font-bold'>
            What is BackInGame?
          </div>
          <div className='collapse-content'>
            <p className='text-sm'>
              It is an online shop where you can buy pre-owned games at
              reasonable price.
            </p>
          </div>
        </div>

        <div className='collapse collapse-arrow join-item '>
          <input
            type='radio'
            name='my-accordion-4'
          />
          <div className='collapse-title text-md font-bold'>
            Is there an iOS/Android app?
          </div>
          <div className='collapse-content'>
            <p className='text-sm'>
              Yes! BackInGame is available on iOS & Android phones. You can also
              sign-up here and download the app later!
            </p>
          </div>
        </div>

        <div className='collapse collapse-arrow join-item '>
          <input
            type='radio'
            name='my-accordion-4'
          />
          <div className='collapse-title text-md font-bold'>
            Are gaming consoles also avalilable?
          </div>
          <div className='collapse-content'>
            <p className='text-sm'>
              Not yet, but we are soon bringing those as well.
            </p>
          </div>
        </div>

        <div className='collapse collapse-arrow join-item '>
          <input
            type='radio'
            name='my-accordion-4'
          />
          <div className='collapse-title text-md font-bold'>
            The feature I want is not in the app...
          </div>
          <div className='collapse-content'>
            <p className='text-sm'>
              Let's make it real! Submit it in the feedback box and there's a
              chance it will be in backingame soon.
            </p>
          </div>
        </div>
      </div>

      <br />
      <br />
      <br />

      <div>
        <div className='bg-base-200   p-4 my-4 text-center'>
          <h2 className='flex flex-col font-bold text-4xl'>
            <span>Feedback</span>
          </h2>
          <br />
          <div className='flex flex-col items-center justify-center'>
            <div>
              <span className='text-justify'>
                we are always looking to improve leave feedback or suggest a
                feature
              </span>
            </div>
            <br />
            <div>
              <a href='mailto:deepakthapa1423@gamil.com'>
                <button className='flex bg-green-600 px-4 py-2 rounded text-white items-center justify-center'>
                  <Envelope size={20} />
                  <span className='pl-1'>Mail Us</span>
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
