package com.app.repositories;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.app.models.Contato;

@RepositoryRestResource(collectionResourceRel = "Contato", path = "Contato")
public interface RepositorioContato extends PagingAndSortingRepository<Contato, Integer> {
	Contato findByIdContato(Integer id);
	List<Contato> findByNoContato(String noContato);
}
