import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';
import { SyntheticEvent, useState, useRef, useEffect } from 'react';
import { Select } from 'src/ui/select';
import {
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
	defaultArticleState,
	fontColors,
	backgroundColors,
	contentWidthArr,
	ArticleStateType,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

type ArticleParamsFormProps = {
	setArticleState: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	setArticleState,
}: ArticleParamsFormProps) => {
	const asideRef = useRef<HTMLDivElement | null>(null);
	const [isParametrsOpen, setParametrsOpen] = useState(false);
	const [formData, setFormData] = useState(defaultArticleState);

	function handleChange(key: keyof ArticleStateType) {
		return (option: OptionType) => {
			setFormData((prev) => ({ ...prev, [key]: option }));
		};
	}
	function handleSubmit(e: SyntheticEvent) {
		e.preventDefault();
		setArticleState(formData);
	}

	function handleReset(e: SyntheticEvent) {
		e.preventDefault();
		setArticleState(defaultArticleState);
		setFormData(defaultArticleState);
	}
	useEffect(() => {
		const handleClick = (e: MouseEvent) => {
			const { target } = e;
			if (
				target instanceof Node &&
				asideRef.current &&
				!asideRef.current.contains(target)
			) {
				setParametrsOpen(false);
			}
		};

		if (isParametrsOpen) {
			window.addEventListener('mousedown', handleClick);
		}

		return () => {
			window.removeEventListener('mousedown', handleClick);
		};
	}, [isParametrsOpen]);

	return (
		<>
			<ArrowButton
				isOpen={isParametrsOpen}
				onClick={() => {
					setParametrsOpen((prev) => !prev);
				}}
			/>
			<aside
				className={clsx(
					styles.container,
					isParametrsOpen && styles.container_open
				)}
				ref={asideRef}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>
					<Select
						selected={formData.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleChange('fontFamilyOption')}
						title='Шрифт'
					/>
					<RadioGroup
						title='Размер Шрифта'
						name='font-size'
						selected={formData.fontSizeOption}
						options={fontSizeOptions}
						onChange={handleChange('fontSizeOption')}
					/>
					<Select
						title='Цвет шрифта'
						selected={formData.fontColor}
						options={fontColors}
						onChange={handleChange('fontColor')}
					/>

					<Separator />
					<Select
						title='Цвет фона'
						selected={formData.backgroundColor}
						options={backgroundColors}
						onChange={handleChange('backgroundColor')}
					/>
					<Select
						title='Ширина Контента'
						selected={formData.contentWidth}
						options={contentWidthArr}
						onChange={handleChange('contentWidth')}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
