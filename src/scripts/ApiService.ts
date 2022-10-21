import { SenderInterface, SenderFunction } from '../interfaces/sender'

class ApiService implements SenderInterface {
  send: SenderFunction = (events)  => {  
    const eventsName = events.map((event) => {
      return event.event;
    })
    
    console.error(events.length, eventsName.join());
    
    
    const response =  window.fetch('http://localhost:8001/track', {
          method: 'POST',
          headers: {
            'content-type': 'text/plain;charset=UTF-8',
            'date': JSON.stringify(new Date().toISOString())
          },
          body: JSON.stringify(new Date().toISOString()),
        })
          // const { data, errors } =  response.json()
          // console.log(data);
    return 'success';   
  }
}


export { ApiService }