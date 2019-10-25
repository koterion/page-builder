import React from 'react'
import ReactDOM from 'react-dom'
import PageBuilder from '../react/pageBuilder'
import './pageBuilder'

ReactDOM.render(
  <PageBuilder>
    <div className='pgBld-row' data-col='4' data-set-col='2'>
      <div className='pgBld-col'>
        <div className='pgBld-content'>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum, ea.</p>
        </div>
      </div>
      <div className='pgBld-col'>
        <div className='pgBld-content'>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis, placeat, velit. Culpa eligendi error et molestias nisi pariatur placeat vitae.</p>
        </div>
      </div>
      <div className='pgBld-col'>
        <div className='pgBld-content'>
          <ul>
            <li>Lorem ipsum dolor sit amet, consectetur.</li>
            <li>Esse magnam maxime non reiciendis ut?</li>
            <li>Aut autem est repellat sed sequi?</li>
            <li>Architecto doloremque ipsa molestiae nemo voluptates!</li>
          </ul>
        </div>
      </div>
      <div className='pgBld-col'>
        <div className='pgBld-content'>
          <h3>Lorem ipsum dolor sit.</h3>
        </div>
      </div>
    </div>
    <div className='pgBld-row' data-col='0'>
      <div className='pgBld-content'>
        <h2>Lorem ipsum dolor sit amet, consectetur.</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet culpa dolorum expedita in itaque
           labore nisi repellendus sapiente soluta voluptate!
        </p>
        <p>Ab aliquid deserunt dicta eos ipsam odit omnis perferendis perspiciatis possimus provident, quidem
           quod ratione, unde. Aut iusto maiores reprehenderit!
        </p>
        <p>A aperiam at, beatae blanditiis consequatur delectus earum error expedita facere inventore ipsam
           laudantium magni neque officiis qui voluptatem voluptatum?
        </p>
        <p>Accusamus aspernatur consectetur, consequatur cum cumque expedita harum in libero magnam nemo odit
           possimus quae quasi rem similique sit voluptates.
        </p>
        <p>Aliquid, dolorum esse expedita harum itaque mollitia odit quae rem voluptatem. Deserunt eveniet, ex
           explicabo labore necessitatibus nisi optio suscipit.
        </p>
      </div>
    </div>
  </PageBuilder>,
  document.getElementById('app')
)

pageBuilder.create(document.querySelector('.textarea'))