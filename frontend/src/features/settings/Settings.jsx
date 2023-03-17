import styled from 'styled-components/macro';
import { useDispatch, useSelector } from 'react-redux';
import { FiArrowLeftCircle } from 'react-icons/fi';
import { setTheme, closeSettings } from 'features/settings/settingsSlice';

import styleConstants from 'shared/styleConstants';

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  row-gap: ${styleConstants.gap1200};
  padding: ${styleConstants.padding400};
  flex: 1;
  background: ${({ theme }) => theme.background300};
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 2rem;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  display: flex;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
`;

const Section = styled.section`
  display: grid;
  margin-top: 2rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.5rem;
`;

const ThemeSettingsWrapper = styled.section`
  display: flex;
  gap: ${styleConstants.gap1200};
  margin-top: var(--padding);
`;

const Label = styled.label`
  display: flex;
  gap: ${styleConstants.gap200};
  cursor: pointer;
`;

const RadioInput = styled.input`
  cursor: pointer;
`;

function Settings() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.settings.theme);

  const handleThemeChange = (e) => dispatch(setTheme(e.target.value));
  const handleBackButtonClick = () => dispatch(closeSettings());
  return (
    <Wrapper>
      <Header>
        <Title>Settings</Title>
        <BackButton onClick={handleBackButtonClick}>
          <FiArrowLeftCircle size="1.75rem" />
        </BackButton>
      </Header>
      <Section>
        <SectionTitle>Theme</SectionTitle>
        <ThemeSettingsWrapper>
          <Label>
            Light
            <RadioInput
              type="radio"
              id="light"
              value="light"
              name="theme"
              checked={theme === 'light'}
              onChange={handleThemeChange}
            />
          </Label>

          <Label>
            Dark
            <RadioInput
              type="radio"
              id="dark"
              value="dark"
              name="theme"
              checked={theme === 'dark'}
              onChange={handleThemeChange}
            />
          </Label>
        </ThemeSettingsWrapper>
      </Section>
    </Wrapper>
  );
}

export default Settings;
