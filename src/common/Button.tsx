import styled from "styled-components"

interface Props {
	type: 'button' | 'submit' | 'reset'
	text: string,
	onClick?: () => void,
	disAbled?: boolean
}

export default function Button({type, text, onClick, disAbled}: Props) {
	return (
		<S.Button type={type} onClick={onClick} disabled={disAbled}>{text}</S.Button>
	)
}

//styled

const S: any = {}

S.Button = styled.button`
	width: 8rem;
	height: 4.5rem;
	background: var(--main-color1);
	border: none;
	border-radius: 2rem;
	color: var(--color-white);
	font-size: 1.6rem;
	font-weight: 600;
	cursor: pointer;
	&:hover,
	&:focus {
		box-shadow: 2px 2px  var(--main-color1-1);
	}
`