import Button from './components/Button'
import Hero from './components/home/Hero'
import ProjectsHome from './components/home/ProjectsHome'

export default function Home() {
	return (
		<main className='pt-4'>
			<Hero />
			<ProjectsHome />
		</main>
	)
}
