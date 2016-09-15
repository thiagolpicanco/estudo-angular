package com.app.repositories;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.app.models.Telefone;

@RepositoryRestResource(collectionResourceRel = "Telefone", path = "Telefone")
public interface RepositorioTelefone extends PagingAndSortingRepository<Telefone, Integer> {

}
