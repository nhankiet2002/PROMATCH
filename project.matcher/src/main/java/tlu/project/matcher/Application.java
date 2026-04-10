package tlu.project.matcher;

import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import tlu.project.matcher.domain.Authority;
import tlu.project.matcher.domain.User;
import tlu.project.matcher.domain.enums.Role;
import tlu.project.matcher.repository.jpa.AuthorityRepository;
import tlu.project.matcher.repository.jpa.UserRepository;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;

@SpringBootApplication
@ComponentScan("tlu.project.matcher.*")
@AllArgsConstructor
public class Application implements CommandLineRunner {
	private UserRepository userRepository;
	private AuthorityRepository authorityRepository;

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@Override
	@Transactional
	public void run(String... args) {
		if (authorityRepository.findAll().isEmpty()) {
			List<Authority> authorityList = new ArrayList<>();

			Authority authority1 = new Authority();
			authority1.setId(1L);
			authority1.setAuthority(Role.ROLE_ADMIN.name());
			authorityList.add(authority1);

			Authority authority2 = new Authority();
			authority2.setId(2L);
			authority2.setAuthority(Role.ROLE_USER.name());
			authorityList.add(authority2);

			Authority authority3 = new Authority();
			authority3.setId(3L);
			authority3.setAuthority(Role.ROLE_TEACHER.name());
			authorityList.add(authority3);

			Authority authority4 = new Authority();
			authority4.setId(4L);
			authority4.setAuthority(Role.ROLE_CORP.name());
			authorityList.add(authority4);

			authorityRepository.saveAll(authorityList);
		}

		if (userRepository.findAll().isEmpty()) {
			User user = new User();
			user.setId(1L);
			user.setEmail("admin1@gmail.com");
			user.setUsername("admin1");
			user.setPassword("$2a$10$HChn6lYWiILJYTUYH0Ynf.wLZlIXnF1yW1eeHCTbOxh4HzEbTTau2");
			Authority authority = authorityRepository.findByAuthority(Role.ROLE_ADMIN.name());
			authority.getUsers().add(user);
			user.setAuthorities(new HashSet<>(Collections.singletonList(authority)));

			userRepository.save(user);
		}}
}
