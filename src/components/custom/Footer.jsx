import React from 'react'

function Footer ()
{
    return (
        <div className='flex flex-col items-center justify-center gap-3 mx-32 mt-20 mb-5 md:gap-5 md:flex-row'>

            <div className='flex flex-row gap-3' >
                <a href="https://www.linkedin.com/in/amrutraote/" target="_blank">
                    <img src="linkedin.svg" className='transition-all size-7 lg:size-9 hover:scale-110 ' alt="linkedin" />
                </a>

                <a href="https://github.com/AmrutRaote" target="_blank">
                    <img src="github-mark.svg" className='transition-all size-7 lg:size-8 hover:scale-110 ' alt="github" />
                </a>
            </div>

            <div>
                <h2>Created By Amrut</h2>
            </div>
        </div>
    )
}

export default Footer
