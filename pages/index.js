import Head from 'next/head'
import Image from 'next/image'
import tw from 'tailwind-styled-components'
import Map from '../components/Map'
import Link from 'next/link'
import {useSelectorContext} from '../context/SelectorContext'

export default function Home() {
  const {carSelector,bikeSelector} = useSelectorContext()
  return (
    <Wrapper>
        <Map/>

        <ActionItems>
            <Header>
                <UberLogo src='https://i.ibb.co/84stgjq/uber-technologies-new-20218114.jpg' />
                <Profile>
                    <Name>Yafet Addisu</Name>
                    <UserImage src="https://scontent.fadd2-1.fna.fbcdn.net/v/t39.30808-6/276253995_3205208563068858_2767212898006114215_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=ZXymnWOb94QAX-q3O22&_nc_ht=scontent.fadd2-1.fna&oh=00_AT8aab3mAwRMD2KxXB1gZI55WgBs9mMVayi1n0StOQa8cA&oe=6313DD04" />
                </Profile>        
            </Header>

            <ActionButtons>
                <Link href="/Search" passHref>
                    <ActionButton onClick={carSelector}>
                      <ActionButtonImage src="https://i.ibb.co/cyvcpfF/uberx.png" />
                      Ride
                    </ActionButton>
                </Link>
                <Link href="/Search" passHref>
                  <ActionButton onClick={bikeSelector}>
                      <ActionButtonImage src="https://i.ibb.co/n776JLm/bike.png" />
                      2-wheels
                  </ActionButton>
                </Link>
            </ActionButtons>

            <InputButton>
                where to ?
            </InputButton>
        </ActionItems>
    </Wrapper>
  )
}

const Wrapper = tw.div`
  flex flex-col h-screen 
`

const ActionItems = tw.div`
  flex-1 p-4
`

const Header = tw.div`
  flex justify-between items-center
`

const UberLogo = tw.img`
  h-28 
`

const Profile = tw.div`
  flex items-center
`

const Name = tw.div`
  mr-4 w-20 text-sm
`

const UserImage = tw.img`
  h-12 w-12 rounded-full border border-gray-200 p-px
`

const ActionButtons = tw.div`
  flex
`

const ActionButton = tw.div`
  flex bg-gray-200 flex-1 m-1 h-32 items-center flex-col justify-center rounded-lg transform hover:scale-95 transition text-xl
`

const ActionButtonImage = tw.img`
  h-3/5
`

const InputButton = tw.div`
  h-20 bg-gray-200 text-2xl p-4 flex items-center mt-8
`