import React, {useContext} from 'react';
import './Home.scss';
import homepage from '../../assets/homepage.png';
import homepageMobile from '../../assets/homepage-mobile.png';
import useMobile from '../../hooks/useMobile';


export default function Home() {
  const mobile = useMobile();
  let image = mobile? homepageMobile : homepage;
 
  return (

    <div className='page home'>
      <div className='light'></div>
      <img src={image} alt={'homepage'} />
      <p>Lörem ipsum sovet predongen traderen till demologi, vinas. Vylig prokotta liksom predår infrat. Jösosade vil multigt, att pren. Tigt edade, och preska flexitarian, om sevis. Oskapet gyngar eftersom tivis segyk. Tetrapp tenyrar diatris, inaskad. Söliga göda, euroheten sus, megabenera. </p>
    </div>
  )
}

