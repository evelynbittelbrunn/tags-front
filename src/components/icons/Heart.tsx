import { useCallback, useState } from 'react'
import styled, { keyframes, css } from 'styled-components';

const pop = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.3); }
  100% { transform: scale(1); }
`;

const StyledHeart = styled.svg<{ isLiked: boolean }>`
    cursor: pointer;
    transition: fill 0.3s ease;
    fill: ${({ isLiked }) => (isLiked ? '#810E13' : 'none')};
    stroke-width: 1.5;
    stroke: ${({ isLiked }) => (isLiked ? '#810E13' : 'currentColor')};
    ${({ isLiked }) =>
        isLiked &&
        css`
        animation: ${pop} 0.3s ease;
      `}
`;

const Heart = () => {

    const [isLiked, setIsLiked] = useState<boolean>(false);

    const toggleLike = useCallback(() => {
        setIsLiked((prevState) => !prevState);
    }, []);

    return (
        <div>
            <StyledHeart
                onClick={toggleLike}
                xmlns="http://www.w3.org/2000/svg"
                width={25}
                viewBox="0 0 24 24"
                isLiked={isLiked}
                aria-pressed={isLiked}
                role="button"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
            </StyledHeart>
        </div>
    )
}

export default Heart